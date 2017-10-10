import requests
import sys

def main():

    # This is the form data that the page sends when logging in
    payload = {
    'username': 'pranav.bhatia@ibm.com'
}

# Use 'with' to ensure the session context is closed after use.
    with requests.Session() as s:
        p = s.post('http://ibm.biz/BdXh4F', data=payload)
        print p.text

if __name__ == '__main__':
    main()
