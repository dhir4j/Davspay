"""
Test script for API endpoints
Run this after deploying to test all endpoints
"""
import requests
import json

# Change this to your API URL
# Local: http://localhost:5000
# Production: https://your_username.pythonanywhere.com
BASE_URL = "http://localhost:5000"

def test_health_check():
    """Test health check endpoint"""
    print("\n=== Testing Health Check ===")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_registration():
    """Test user registration"""
    print("\n=== Testing Registration ===")
    user_data = {
        "email": "test@example.com",
        "password": "Test1234",
        "full_name": "Test User",
        "company_name": "Test Company",
        "phone": "9876543210"
    }

    try:
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json=user_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")

        if response.status_code == 201:
            return response.json()['data']['access_token']
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def test_login():
    """Test user login"""
    print("\n=== Testing Login ===")
    credentials = {
        "email": "test@example.com",
        "password": "Test1234"
    }

    try:
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json=credentials,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")

        if response.status_code == 200:
            return response.json()['data']['access_token']
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def test_get_current_user(token):
    """Test get current user endpoint"""
    print("\n=== Testing Get Current User ===")
    try:
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_update_profile(token):
    """Test update profile endpoint"""
    print("\n=== Testing Update Profile ===")
    update_data = {
        "full_name": "Updated Test User",
        "company_name": "Updated Company",
        "phone": "9999999999"
    }

    try:
        response = requests.put(
            f"{BASE_URL}/api/auth/update-profile",
            json=update_data,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_invalid_login():
    """Test login with invalid credentials"""
    print("\n=== Testing Invalid Login ===")
    credentials = {
        "email": "test@example.com",
        "password": "wrongpassword"
    }

    try:
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json=credentials,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 401
    except Exception as e:
        print(f"Error: {e}")
        return False

def run_all_tests():
    """Run all API tests"""
    print("=" * 50)
    print("DAVSPAY API TESTS")
    print("=" * 50)
    print(f"Testing API at: {BASE_URL}")

    results = {}

    # Test 1: Health Check
    results['health_check'] = test_health_check()

    # Test 2: Registration
    token = test_registration()
    results['registration'] = token is not None

    # If registration worked, test login
    if token:
        # Test 3: Get Current User
        results['get_user'] = test_get_current_user(token)

        # Test 4: Update Profile
        results['update_profile'] = test_update_profile(token)
    else:
        # If registration failed (user might already exist), try login
        print("\nRegistration failed (user might exist), trying login...")
        token = test_login()
        results['login'] = token is not None

        if token:
            results['get_user'] = test_get_current_user(token)
            results['update_profile'] = test_update_profile(token)

    # Test 5: Invalid Login
    results['invalid_login'] = test_invalid_login()

    # Print summary
    print("\n" + "=" * 50)
    print("TEST SUMMARY")
    print("=" * 50)

    passed = sum(1 for result in results.values() if result)
    total = len(results)

    for test_name, result in results.items():
        status = "✓ PASSED" if result else "✗ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")

    print("\n" + "=" * 50)
    print(f"Results: {passed}/{total} tests passed")
    print("=" * 50)

    return passed == total

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
