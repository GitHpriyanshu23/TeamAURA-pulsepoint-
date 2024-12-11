from pyzbar.pyzbar import decode
import cv2

# Path to a sample QR code image
# Replace 'test_qr_code.png' with an actual QR code image file path.
image_path = 'test_qr_code.png'

# Load the image
image = cv2.imread(image_path)

if image is None:
    print("Failed to load image. Ensure the image path is correct.")
else:
    # Decode QR code in the image
    decoded_objects = decode(image)

    if decoded_objects:
        for obj in decoded_objects:
            print("QR Code Type:", obj.type)
            print("QR Code Data:", obj.data.decode('utf-8'))
    else:
        print("No QR code detected in the image.")
