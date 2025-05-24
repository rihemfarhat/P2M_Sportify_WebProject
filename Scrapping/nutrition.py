from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import pandas as pd
import time

# Setup Selenium (headless)
options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)

# URL to scrape
url = "https://www.allrecipes.com/recipes/84/healthy-recipes/"
driver.get(url)

# Scroll down to load more content (optional)
scroll_pause = 2
last_height = driver.execute_script("return document.body.scrollHeight")

for _ in range(3):  # Scroll multiple times if needed
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(scroll_pause)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# Parse page
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Close the driver
driver.quit()

# Find recipe cards
recipes = soup.select('article.fixed-recipe-card')  # fallback if needed
if not recipes:
    recipes = soup.select('a.comp.card__titleLink')  # new layout

# Extract data
recipe_list = []
for recipe in recipes:
    title_tag = recipe.select_one('h3.card__title') or recipe.select_one('span.card__title') or recipe.select_one('.card__titleLink')
    link_tag = recipe.get('href') if recipe.name == 'a' else recipe.find('a', href=True)

    title = title_tag.get_text(strip=True) if title_tag else "No title"
    link = link_tag if isinstance(link_tag, str) else link_tag['href'] if link_tag else "No link"

    recipe_list.append({'title': title, 'link': link})

# Convert to DataFrame
df = pd.DataFrame(recipe_list)
print(df.head())
