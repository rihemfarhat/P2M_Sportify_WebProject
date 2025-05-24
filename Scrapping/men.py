from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
import time

# 📌 Connexion MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["authDB"]
collection = db["men"]  # tu peux créer une collection spécifique si tu veux : women_shoes

# 📌 Config Selenium
options = webdriver.ChromeOptions()
options.headless = True
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 📌 Pages à scraper
base_url = "https://www.tuttosport.com.tn/14-homme?page="
total_pages = 3  # adapte selon le nombre de pages

for page in range(1, total_pages + 1):
    url = f"{base_url}{page}"
    print(f"🚀 Scraping {url}")
    driver.get(url)

    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "product-miniature"))
        )
    except TimeoutException:
        print(f"❌ Timeout sur la page {url}")
        continue

    products = driver.find_elements(By.CLASS_NAME, "product-miniature")

    for item in products:
        try:
            # Titre et lien
            title_elem = item.find_element(By.CSS_SELECTOR, "h3.product-title a")
            title = title_elem.text.strip()
            item_link = title_elem.get_attribute("href")

            # Prix
            price_elem = item.find_element(By.CSS_SELECTOR, ".product-price-and-shipping .price")
            price = price_elem.text.strip()

            # Image
            try:
                img_tag = item.find_element(By.TAG_NAME, "img")
                img_url = img_tag.get_attribute("src")
            except NoSuchElementException:
                img_url = "No image available"

            product_data = {
                "title": title,
                "price": price,
                "link": item_link,
                "image": img_url,
                "page_url": url,
                "category": "chaussures_sport_femme"
            }

            # Vérifie doublon avant d'insérer
            if collection.find_one({"link": item_link}):
                print(f"✅ Déjà existant : {title}")
            else:
                collection.insert_one(product_data)
                print(f"🆕 Ajouté : {title}")

        except Exception as e:
            print(f"❌ Erreur avec un produit : {e}")

driver.quit()
print("🎉 Scraping terminé !")
