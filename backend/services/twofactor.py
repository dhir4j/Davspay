"""
2Factor API integration service
Handles OTP sending and verification via 2Factor.in API
"""
import requests
from config import Config

BASE_URL = "https://2factor.in/API/V1"

class TwoFactorService:
    """Service class for 2Factor API operations"""

    @staticmethod
    def send_otp(phone, template="OTP1"):
        """
        Send OTP to phone number using 2Factor API

        Args:
            phone (str): Phone number with country code (e.g., +919876543210)
            template (str): OTP template name (default: OTP1)

        Returns:
            dict: API response with status and session_id/details
        """
        url = f"{BASE_URL}/{Config.TWO_FACTOR_API_KEY}/SMS/{phone}/AUTOGEN3/{template}"
        try:
            response = requests.get(url)
            return response.json()
        except Exception as e:
            return {"Status": "Error", "Details": str(e)}

    @staticmethod
    def verify_otp(session_id, otp):
        """
        Verify OTP using session ID from send_otp

        Args:
            session_id (str): Session ID returned from send_otp
            otp (str): OTP entered by user

        Returns:
            dict: API response with verification status
        """
        url = f"{BASE_URL}/{Config.TWO_FACTOR_API_KEY}/SMS/VERIFY/{session_id}/{otp}"
        try:
            response = requests.get(url)
            return response.json()
        except Exception as e:
            return {"Status": "Error", "Details": str(e)}
