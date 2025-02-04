# Chess App

This is a web-based chess app using Python Django. I plan to make a 1 vs 1 mode and different AI modes available.

## Setup
Download the code and run the following commands in the terminal:
```
python -m venv env
./env/Scripts/activate
python -m pip install Django
pip install chess
python manage.py migrate
python manage.py makemigrations
py manage.py collectstatic
```
Create a .txt file with your Django SecretKey one directory above.

## Usage
Run:
```python manage.py runserver```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
