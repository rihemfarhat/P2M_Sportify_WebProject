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
client = MongoClient("mongodb://localhost:27017/")  # Connexion locale à MongoDB
db = client["authDB"]  # Base de données
collection = db["accessoires"]  # Collection des produits

# 📌 Configuration de Selenium
options = webdriver.ChromeOptions()
options.headless = True  # Mode sans interface graphique
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 📌 URL cible
urls = [
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=1",
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=2",
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=3",
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=4",
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=5",
    "https://www.tuttosport.com.tn/16-accessoire-de-sport?page=6"
    
]

for url in urls:
    # Open each URL and perform the scraping as before
    driver.get(url)
    
    try:
        WebDriverWait(driver, 30).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "product-miniature"))
        )
    except TimeoutException:
        print(f"❌ Timeout: Page load failed for {url}.")
        continue

    equipment_items = driver.find_elements(By.CLASS_NAME, "product-miniature")

    for item in equipment_items:
        try:
            title = item.find_element(By.CLASS_NAME, "product-title").text.strip()
            price = item.find_element(By.CLASS_NAME, "price").text.strip()
            link_element = item.find_element(By.TAG_NAME, "a")
            item_link = link_element.get_attribute("href")
            img_tag = item.find_element(By.TAG_NAME, "img")
            img_url = img_tag.get_attribute("src") if img_tag else "No image available"
            
            # Store data
            equipment_data = {
                "title": title,
                "price": price,
                "link": item_link,
                "image": img_url,
                "page_url": url
            }

            # Insert data into MongoDB if not already present
            if collection.find_one({"link": item_link}):
                print(f"✅ Equipment already exists: {title}")
            else:
                collection.insert_one(equipment_data)
                print(f"✅ Equipment added: {title}")

        except (NoSuchElementException, TimeoutException) as e:
            print(f"❌ Error scraping equipment from {url}: {e}")

# Close the browser
driver.quit()

print("🎉 Scraping complete! Equipment has been added to MongoDB.")