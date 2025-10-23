# petAdoptionProject
# 🐾 Pet Adoption Center Management System

A full-stack database management system for a pet adoption center. This project allows users to manage pets, adopters, adoptions, staff, donations, and medical records using a PostgreSQL database, with optional frontend integration for image uploads and browsing.

---

## 📌 Features

- 🐶 Store and manage pet details 
- 👨‍👩‍👧 Track adopters and adoption records
- 💰 Manage donations and donor records
- 👨‍⚕️ Maintain staff and medical history for pets
- 🖼️ Upload and display pet images using Supabase storage 
- 🧾 Designed with third normal form (3NF) in mind

---

## 🧰 Technologies Used

- **PostgreSQL** – Core relational database
- **pgAdmin** – GUI for managing the database
- **Supabase** – For image upload and public URL hosting 
- **React** – Frontend interface 
- **Node.js / Express** – Backend API 

---

## 🗃️ Database Schema

### Key Tables:
- `pets` – Pet info including image URL
- `adopters` – People adopting pets
- `adoptions` – Adoption records (linking pets and adopters)
- `staff` – Staff managing the center
- `donations` – Records of donors and amounts
- `medical_records` – Medical history of pets

### Normalization:
- The database is normalized up to **3NF** to reduce redundancy and maintain data integrity.

---

## 🖼️ Image Upload Feature 

 using Supabase for image upload:

1. Create a bucket in Supabase
2. Upload images from your frontend
3. Store public URLs in the `pets.image_url` field
4. Display the image using `<img src={image_url} />`

---



![](images/physical_schema.png)
![](images/logical_schema.jpeg)

![](images/physical_schema.png)

![](images/ER_Diagram.jpeg)


![](images/1.png)
![](images/2.png)
![](images/3.png)
![](images/4.png)
![](images/5.png)
![](images/6.png)
![](images/7.png)
![](images/8.png)
![](images/9.png)
![](images/10.png)
![](images/11.png)
![](images/12.png)
![](images/13.png)
![](images/14.png)


