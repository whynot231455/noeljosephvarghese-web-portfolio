import asyncio
from playwright.async_api import async_playwright
import os

async def capture_screenshots():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Create a directory for screenshots if it doesn't exist
        os.makedirs("public/screenshots", exist_ok=True)

        # Open a new page
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # Navigate to the local dev server
        try:
            await page.goto("http://localhost:3000")
            await asyncio.sleep(2)  # Wait for animations

            # 1. Capture Creative Mode (Default)
            await page.screenshot(path="public/screenshots/creative_mode.png")
            print("Captured Creative Mode")

            # 2. Toggle to Developer Mode
            # Based on the UI, the toggle button contains "DEVELOPER"
            developer_button = page.get_by_text("DEVELOPER", exact=False)
            if await developer_button.is_visible():
                await developer_button.click()
                await asyncio.sleep(2)  # Wait for transition
                await page.screenshot(path="public/screenshots/developer_mode.png")
                print("Captured Developer Mode")

            # 3. Capture Projects Section
            # Scroll down to work/projects
            await page.get_by_text("WORK", exact=False).first.click()
            await asyncio.sleep(1)
            await page.screenshot(path="public/screenshots/projects_section.png")
            print("Captured Projects Section")

        except Exception as e:
            print(f"Error capturing screenshots: {e}")
            # Ensure we don't leave a broken screenshot
            if os.path.exists("public/screenshots/error.png"):
                os.remove("public/screenshots/error.png")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(capture_screenshots())
