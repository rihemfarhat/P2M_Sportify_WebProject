from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

# 📌 Connexion à MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["authDB"]
collection = db["equipment"]

# 📌 Configuration Selenium
options = webdriver.ChromeOptions()
options.headless = True  # Exécute Chrome sans interface
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 📌 URLs à scraper
urls = [
    "https://www.tuttosport.com.tn/179-materiel-sport",

]

# 📌 Scraping
for url in urls:
    print(f"🚀 Scraping {url}")
    driver.get(url)
    
    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "product-miniature"))
        )
    except TimeoutException:
        print(f"❌ Timeout: Impossible de charger la page {url}")
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

            # Données à stocker
            product_data = {
                "title": title,
                "price": price,
                "link": item_link,
                "image": img_url,
                "page_url": url
            }

            # Insertion MongoDB
            if collection.find_one({"link": item_link}):
                print(f"✅ Déjà existant : {title}")
            else:
                collection.insert_one(product_data)
                print(f"🆕 Ajouté : {title}")

        except Exception as e:
            print(f"❌ Erreur avec un produit sur {url} : {e}")

# 📌 Fin
driver.quit()
print("🎉 Scraping terminé et enregistré dans MongoDB.")
