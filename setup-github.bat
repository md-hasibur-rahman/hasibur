@echo off
echo ========================================
echo    GitHub Repository Setup Script
echo ========================================
echo.

echo এই স্ক্রিপ্ট আপনার প্রজেক্ট GitHub এ আপলোড করতে সাহায্য করবে
echo.

echo প্রথমে নিশ্চিত করুন যে:
echo 1. Git ইনস্টল করা আছে
echo 2. GitHub এ একটি নতুন repository তৈরি করেছেন
echo 3. Repository এর নাম এবং আপনার username জানেন
echo.

set /p username="আপনার GitHub username লিখুন: "
set /p reponame="Repository এর নাম লিখুন (যেমন: portfolio): "

echo.
echo Git repository ইনিশিয়ালাইজ করা হচ্ছে...

git init
git add .
git commit -m "Initial commit: Personal portfolio website"
git branch -M main
git remote add origin https://github.com/md-hasibur-rahman/%reponame%.git

echo.
echo GitHub এ পুশ করা হচ্ছে...
git push -u origin main

echo.
echo ========================================
echo সফলভাবে সম্পন্ন হয়েছে!
echo.
echo আপনার ওয়েবসাইট এই লিংকে দেখুন:
echo https://md-hasibur-rahman.github.io/%reponame%/
echo.
echo GitHub Pages সেটআপ করতে:
echo 1. GitHub.com এ আপনার repository তে যান
echo 2. Settings ^> Pages এ যান
echo 3. Source: Deploy from a branch
echo 4. Branch: main
echo 5. Folder: / (root)
echo 6. Save ক্লিক করুন
echo.
echo ৫-১০ মিনিট পর আপনার সাইট লাইভ হবে!
echo ========================================

pause
