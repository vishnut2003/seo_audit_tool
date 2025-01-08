# SEO Audit Tool

The **SEO Audit Tool** is a comprehensive application built with **Next.js**, designed to simplify website audits, competitor analysis, and other SEO-related tasks. It integrates with the **SEOptimer API** for specific reports, uses **Puppeteer** for advanced website audits, and provides additional insights through custom logic. Styled with **Tailwind CSS**, this tool ensures a seamless user experience.

---

## 🚀 Features

- **Website Audits**  
  Perform detailed audits using Puppeteer and custom logic.  

- **Competitor Analysis**  
  Evaluate competitors to uncover optimization opportunities.  

- **Integrated API Reports**  
  Utilize the **SEOptimer API** for advanced insights.  

- **Custom SEO Reports**  
  Generate reports with in-house logic for added flexibility.  

- **Spreadsheet Export**  
  Export audit results to Google Sheets using the Google API.  

- **Full Stack in Next.js**  
  Both the frontend and backend are built with Next.js.  

---

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **Database**: MongoDB  
- **Authentication**: NextAuth.js  
- **Web Scraping**: Puppeteer  
- **API Integration**: [SEOptimer API](https://www.seoptimer.com/)  
- **Google API**: Google Sheets integration  

---

## 📖 Environment Variables

Ensure the following `.env` variables are configured:  

```env
# SEOptimer API Key
OPTIMER_API_KEY=

# MongoDB Connection String
MONGODB_URI=

# NextAuth Configuration
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Main Admin Login Details
MAIN_ADMIN_EMAIL=
MAIN_ADMIN_PASSWORD=

# Google Spreadsheet API Configuration
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_OFFICIAL_GMAIL=
```

---

## 🔧 Pre-Setup (Puppeteer Installation)

Puppeteer is used for advanced website auditing. Before running the application locally, ensure Puppeteer’s required Chromium browser is installed:

```bash
npx puppeteer browsers install
```

> **Note:** This command is only required for local or non-AWS Lambda server setups. If deploying on AWS Lambda, Puppeteer handles browser installation internally.

---

## 📖 How to Use

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/seo-audit-tool.git
   cd seo-audit-tool
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env.local` file and configure the variables as described above.

4. **Install Puppeteer Browsers**  
   ```bash
   npx puppeteer browsers install
   ```

5. **Run the Development Server**  
   ```bash
   npm run dev
   ```

6. **Access the Application**  
   Open your browser and navigate to `http://localhost:3000`.

7. **Admin Access**  
   Use the credentials set in the `MAIN_ADMIN_EMAIL` and `MAIN_ADMIN_PASSWORD` variables to log in.

---

## 📦 Deployment

### Deploying on AWS Lambda

- Puppeteer is preconfigured for Lambda environments.  
- Skip the `npx puppeteer browsers install` command when deploying to AWS Lambda.  

### Deploying on Vercel  

1. Push your code to a Git repository.  
2. Connect the repository to Vercel.  
3. Add your environment variables in the Vercel dashboard.  
4. Deploy the application.  

---

## 📜 License

This project is licensed under the MIT License.

---

## 🌟 Contributing

Contributions are welcome!  

1. Fork the repository.  
2. Create a new branch for your feature or bug fix.  
3. Commit and push your changes.  
4. Submit a pull request.

---

## 📧 Contact

For support or inquiries, please reach out to **iam.vishnu.bhaskar@gmail.com**.
