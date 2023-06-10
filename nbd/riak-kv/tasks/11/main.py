import requests
import json

BUCKET_NAME = "s29711"
KEY = "key1"
BASE_URL = "http://localhost:8098/riak"

# Tworzenie dokumentu JSON
data = {
    "field1": "value1",
    "field2": 123,
    "field3": ["a", "b", "c"],
    "field4": {"nested_field": "nested_value"}
}

# Dodawanie dokumentu do bazy
put_url = f"{BASE_URL}/{BUCKET_NAME}/{KEY}"
headers = {"Content-Type": "application/json"}
response = requests.put(put_url, headers=headers, data=json.dumps(data))
print("Dodano dokument do bazy.")
print("Odpowiedź serwera:", response.status_code)

# Pobieranie dokumentu z bazy
get_url = f"{BASE_URL}/{BUCKET_NAME}/{KEY}"
response = requests.get(get_url)
fetched_data = response.json()
print("\nPobrany dokument:")
print(json.dumps(fetched_data, indent=4))

# Modyfikowanie dokumentu
new_field = {"new_field": "new_value"}
fetched_data.update(new_field)
modified_data = fetched_data

# Aktualizowanie dokumentu w bazie
response = requests.put(put_url, headers=headers, data=json.dumps(modified_data))
print("\nDokument zaktualizowany w bazie.")
print("Odpowiedź serwera:", response.status_code)

# Pobieranie zaktualizowanego dokumentu z bazy
response = requests.get(get_url)
updated_data = response.json()
print("\nZaktualizowany dokument:")
print(json.dumps(updated_data, indent=4))

# Usuwanie dokumentu z bazy
delete_url = f"{BASE_URL}/{BUCKET_NAME}/{KEY}"
response = requests.delete(delete_url)
print("\nDokument usunięty z bazy.")
print("Odpowiedź serwera:", response.status_code)

# Ponowne próba pobrania usuniętego dokumentu
response = requests.get(get_url)
if response.status_code == 404:
    print("\nDokument nie istnieje w bazie. Pobranie nieudane.")
else:
    print("\nPobrany dokument:")
    print(json.dumps(response.json(), indent=4))
