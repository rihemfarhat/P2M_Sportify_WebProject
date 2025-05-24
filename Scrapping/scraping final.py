from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# 📌 Connexion à MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Connexion à MongoDB
db = client["authDB"]  # Base de données
collection = db["articles"]  # Collection des articles

# 📌 Configuration de Selenium (ChromeDriver)
options = webdriver.ChromeOptions()
options.headless = True  # Mode sans interface graphique
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 📌 URL cible
url = "https://www.xperience-sport.com/blog/tous-articles-de-blog"

# Ouvrir la page avec Selenium
driver.get(url)

# Attendre le chargement de la page
time.sleep(5)
WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "flex.flex-col.gap-2"))
)

# 📌 Sélection de tous les articles
articles = driver.find_elements(By.CLASS_NAME, "flex.flex-col.gap-2")

# 📌 Itérer sur tous les articles
for article in articles:
    try:
        # 📌 Lien complet
        link_elem = article.find_element(By.TAG_NAME, "a")
        raw_link = link_elem.get_attribute("href")

        # 📌 Image
        img_elem = article.find_element(By.TAG_NAME, "img")
        img_url = img_elem.get_attribute("src")

        # 📌 Titre
        title_elem = article.find_element(By.CSS_SELECTOR, ".font-black.text-sm.uppercase")
        title = title_elem.text.strip()

        # 📌 Description
        desc_elem = article.find_element(By.CSS_SELECTOR, ".text-xs.text-dove-gray.line-clamp-1")
        description = desc_elem.text.strip()

        # 📌 Date
        date_elem = article.find_element(By.CSS_SELECTOR, ".font-black.italic.text-gray-400.text-xs.mb-2")
        date = date_elem.text.strip()

        # 📌 Enregistrement dans MongoDB
        article_data = {
            "title": title,
            "description": description,
            "link": raw_link,
            "image": img_url,
            "date": date,
            "page_url": url
        }

        collection.insert_one(article_data)
        print(f"✅ Article ajouté: {title}")

    except Exception as e:
        print(f"❌ Erreur lors du scraping d'un article : {e}")

# Fermer le navigateur
driver.quit()

print("🎉 Scraping terminé ! Les articles ont été ajoutés à MongoDB.")
