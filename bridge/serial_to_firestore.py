import os
import firebase_admin
from firebase_admin import credentials, firestore
import serial
from datetime import datetime

# Initialize Firestore (path to a service-account key, kept outside the repo)
cred = credentials.Certificate(os.environ["FIREBASE_CREDENTIALS"])
app = firebase_admin.initialize_app(cred)
store = firestore.client()

# Firestore collection name
collection_name = "COLLECTION_TO_ADD_TO"  # Replace with your Firestore collection name

# Initialize Serial connection
ser = serial.Serial('/dev/cu.usbmodem21301', 9600, timeout=1)  # Replace 'COM_PORT' and 'BAUD_RATE' with the correct values

# Function to send current date and time to Firestore
def send_current_datetime_to_firestore():
    current_datetime = str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    data = {
        "datetime": "The current time is" + current_datetime
    }
    doc_ref = store.collection(collection_name).document()
    doc_ref.set(data)
    print(f'Sent current datetime: {current_datetime} to Firestore')

# Listen for "Hi" from Arduino
try:
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            if line == "Hi":
                send_current_datetime_to_firestore()
except KeyboardInterrupt:
    print("Serial connection interrupted")
finally:
    ser.close()
