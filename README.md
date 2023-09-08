# Project Deployment Instructions

To deploy the entire project, ensure that you have the following prerequisites installed:

1. **Git**
2. **Node.js and npm**
3. **MySQL**
4. **Python**

## Front End Deployment

### Step 1: Clone the GitHub Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Next.js Server

```bash
npm start
```

## Setting up MySQL Server

Ensure you have a MySQL server running with the following credentials:

```python
'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'peax_project',
    'USER': 'root',
    'PASSWORD': 'rootroot',
    'HOST': 'localhost',  # or the hostname where your MySQL server is running
    'PORT': '3306',        # or the port on which your MySQL server is listening
}
```

## Deploying the Django Server

### Step 1: Clone the GitHub Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### Step 2: Create a Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate  # Use 'source venv/bin/activate' on Unix-based systems
```

### Step 3: Install Python Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Migrate the Database

```bash
python manage.py migrate
```

### Step 5: Run the Django Server

```bash
python manage.py runserver
```

Now your project should be deployed and running successfully.

**Note:** Make sure to replace `<repository_url>` and `<repository_directory>` with the actual URL and directory name of your project repository. Additionally, ensure that you have proper MySQL server credentials set in your Django settings.
