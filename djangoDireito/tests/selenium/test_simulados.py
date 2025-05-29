import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions


class TestSimuladoComLogin():
    def setup_method(self, method):
        self.driver = webdriver.Firefox()
        self.vars = {}

    def teardown_method(self, method):
        self.driver.quit()

    def test_simulado_com_login(self):
        self.driver.get("http://localhost:4200/login")
        self.driver.set_window_size(1066, 747)
        wait = WebDriverWait(self.driver, 15)

        username_input = wait.until(
            expected_conditions.presence_of_element_located((By.ID, "username"))
        )
        username_input.send_keys("admin")

        password_input = wait.until(
            expected_conditions.presence_of_element_located((By.ID, "password"))
        )
        password_input.send_keys("admin")

        login_btn = wait.until(
            expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
        )
        login_btn.click()

        wait.until(expected_conditions.url_contains("/home"))

        self.driver.get("http://localhost:4200/simulado/12")

        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".alternative button")) >= 1)

        self.driver.find_elements(By.CSS_SELECTOR, ".alternative button")[0].click()

        wait.until(
            expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, ".right .skip"))
        ).click()

        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".alternative button")) >= 1)
        self.driver.find_elements(By.CSS_SELECTOR, ".alternative button")[0].click()

        wait.until(
            expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, ".submit"))
        ).click()

        wait.until(
            expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, ".submit"))
        ).click()
