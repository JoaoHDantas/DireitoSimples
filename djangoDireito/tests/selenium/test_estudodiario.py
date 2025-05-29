import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions


class TestEstudoDiarioComLogin():
    def setup_method(self, method):
        self.driver = webdriver.Firefox()
        self.vars = {}

    def teardown_method(self, method):
        self.driver.quit()

    def test_estudo_diario(self):
        self.driver.get("http://localhost:4200/login")
        self.driver.set_window_size(1066, 747)
        wait = WebDriverWait(self.driver, 15)

        wait.until(expected_conditions.presence_of_element_located((By.ID, "username"))).send_keys("admin")
        wait.until(expected_conditions.presence_of_element_located((By.ID, "password"))).send_keys("admin")
        wait.until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()
        wait.until(expected_conditions.url_contains("/home"))
        self.driver.get("http://localhost:4200/estudo-diario")

        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".etapa.ativa")) >= 1)
        etapa = self.driver.find_element(By.CSS_SELECTOR, ".etapa.ativa")
        self.driver.execute_script("arguments[0].click();", etapa)
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".alternatives li")) >= 1)
        alternativa = self.driver.find_elements(By.CSS_SELECTOR, ".alternatives li")[0]
        self.driver.execute_script("arguments[0].click();", alternativa)

        wait.until(expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "button.submit:not([disabled])"))).click()
        wait.until(expected_conditions.element_to_be_clickable((By.ID, "finalizar"))).click()
