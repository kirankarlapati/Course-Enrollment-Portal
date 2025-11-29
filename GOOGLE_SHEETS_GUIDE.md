# 📊 Google Sheets Integration - Complete Guide

## 🔗 **Your Google Sheets Link:**
https://docs.google.com/spreadsheets/d/1P5zOHI0juBMf55pKV9zN0ZqcwXCLLRnXwjmb66vrigw/edit

## 🔗 **Your Google Form Link:**
https://docs.google.com/forms/d/e/1FAIpQLSeSlfZ2veZowVfDYzg7VyZqLbNDLW445KJHwwCK6M6cJ4IFCQ/viewform

---

## 📝 **How the System Works:**

### **Student Enrollment Flow:**

1. **Student clicks "Enroll Now"** on any course
2. **Modal form appears** with:
   - Student Name (auto-filled)
   - Email (auto-filled)
   - Course ID (auto-filled)
   - Course Cost (auto-filled)
   - **Transaction ID (MUST BE FILLED BY STUDENT)**

3. **Student enters their payment Transaction ID**
   - Example: UPI ID, Card Reference Number, etc.

4. **Click "Submit Enrollment"**
   - Enrollment saved to MongoDB database (status: "pending")
   - **Google Form opens in new tab** with pre-filled data

5. **Student submits the Google Form**
   - Data appears in your Google Sheets immediately
   - Admin notification created in system

---

## 👨‍💼 **Admin Approval Flow:**

### **Step 1: Check Admin Dashboard**
- Login as admin
- Go to Admin Dashboard
- See new enrollment notifications

### **Step 2: Verify Payment in Google Sheets**
- Click "Open Sheets" button in dashboard
- Or directly visit: https://docs.google.com/spreadsheets/d/1P5zOHI0juBMf55pKV9zN0ZqcwXCLLRnXwjmb66vrigw/edit
- Find the student's entry with Transaction ID
- Verify the transaction ID is valid

### **Step 3: Approve Enrollment**
- Return to Admin Dashboard
- Click "Approve Enrollment" for that student
- Student status changes from "pending" to "approved"
- Student can now access the course

---

## ✅ **What's Updated:**

1. ✅ **Transaction ID field is now editable** - students must enter it
2. ✅ **Google Form opens in new tab** with pre-filled data
3. ✅ **Admin Dashboard shows Google Sheets link**
4. ✅ **Clear instructions for admin approval process**
5. ✅ **Payment verification through Google Sheets**

---

## 🧪 **Testing the Complete Flow:**

### **As Student:**
1. Open: http://localhost:3005
2. Login/Register
3. Click any course → "Enroll Now"
4. Enter Transaction ID (e.g., "UPI123456789")
5. Click "Submit Enrollment"
6. Google Form opens → Click "Submit" on that form
7. Check Google Sheets - your data should appear!

### **As Admin:**
1. Login with admin credentials
2. Go to Admin Dashboard
3. Click "Open Sheets" to verify payment
4. Check the Transaction ID in sheets
5. Return to dashboard
6. Click "Approve Enrollment"
7. Student enrollment is now approved!

---

## 📊 **Google Sheets Columns:**

Your sheet should have these columns:
1. Timestamp (auto-added by Google Forms)
2. Student Name
3. Email
4. Course ID
5. Course Cost
6. Transaction ID

---

## 🔧 **Troubleshooting:**

**Problem: Google Sheets not updating**
- Solution: Make sure to **submit the Google Form** that opens in the new tab
- The form opens pre-filled, but you MUST click Submit button

**Problem: Can't see data in sheets**
- Solution: Check if the Google Form is linked to your spreadsheet
- Go to Form → Responses → Link to Sheets

**Problem: Transaction ID not saving**
- Solution: Make sure student fills the Transaction ID field (it's required)

---

## 📌 **Important Notes:**

1. **Google Form must be submitted** - just opening it doesn't save data
2. **Transaction ID is required** - students cannot skip this field
3. **Admin must verify in Sheets first** - before approving in dashboard
4. **Approval is manual** - admin clicks approve after verifying payment

---

## 🎯 **Quick Links:**

- **Google Sheets:** https://docs.google.com/spreadsheets/d/1P5zOHI0juBMf55pKV9zN0ZqcwXCLLRnXwjmb66vrigw/edit
- **Google Form:** https://forms.gle/wQzzn9N8Auqm3PB49
- **App (Local):** http://localhost:3005
- **Admin Dashboard:** http://localhost:3005/admin-dashboard

---

**Last Updated:** November 29, 2025
