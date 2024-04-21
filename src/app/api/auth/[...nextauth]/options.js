import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const options = {
  site : 'https://note-me-omega.vercel.app',
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    //   profile(profile) {
    //     console.log("Github Profile", profile);
    //     let userRole = "github user";
    //     if (profile?.email === 'momgmohit@gmail.com') {
    //       userRole = "admin";
    //     }
    //     return { ...profile, role: userRole };
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#5FA5F9", // Hex color code
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEWg0fH///////ye0fObzvDv+PumzunM5PLz+fu83vSu1/LX7Pb6/vyc0vPV5vCe0/De7fam1fDl8/nH4fPb7PmlzvHF5PG42OvA3OzT6/G12fKV0fmczvbE5Pam1Oudy+lpPNBgAAAEQUlEQVR4nO2cbY+rKhRGt4KiFEq10zfnaP//vzxgO82cM7ncO3eTuDN51ofGGKQuRdggQgQAAAAAAAAAAAAAAAAAAAAAAAAA8EIJy4dxAmEYCma3oZAiO5tdKQ5vR7udC6l+dFVVV0Wo69o1hnzBG/0t+qaUyUOnqpxpNyppQxOvZkGZ9eZc/SYu6pr+vtmbfRluTRIa9SYyekz/Pel3VQY/7GKGbhMX0k0sY0a3baH8Tr/m9AyWyu576FQsdqltOH1AXzbp9fN58+/da+Kg+25bGVOyiEOmDD9YRmny/tng/XtTESsvHRMr364B2TMmkyKjaJrP9v44qbi55BtyT9NxbpOMUu3l3LchpRcio/zcONdc0j25my5uDlmb5RzTjNGGNMXk3WEJsU4TIkNTbHRiOHD3pPs1yhnvGRt1dSkQusWitm7W9S7lI0XGpMCqrlvltaldOtVLTsbEpt7VLnXI9inArJtfSo7MHM8tnpONp2fWmLFbcsea1cAN8eHZrzGmE3RnvG3W66tjxdSn/fWocw/N5FKpvA2xVD6K2VsIYmSo7ZuuGydK9ZppXDfa9+zBJia/2RhcPpIf7ql6liJD2vbH0yqgtJ3nJVa5mWNTTd4vsRIMyWHuh7VpEiMTHV6bOlvEPtK8Er2OlCNTAMiUATJZIFMGyGSBTBkgkwUyZYBMFsiUATJZIFOGnymjAjsvUWPNmgnJkfHUMzkPcmSmxkW6189Xvuz+c0d1DVJkwtDVPKqLmOHZYDvudIarEjNwPoxVx8Jd5Mj4pWVCct6ceeJOz1hzlCFTCMiU4ZMMdzris5xJkFHklWY9Mc94RoKMJzLmyOI8SZEhWt9osrhKqZqDp44nIyicCWTZMkct523z2DCZTiREpvXDEFgsQcg8AK9aT4EZzgh6dc6eWI3YrCQ/VSbGI56DoHAmULgd3ljcllQFSJBZwxnmgMZVjIyy7NEZSTINK5qJiInNSLW7A5OLlxEBpCbvzswrRkOLGBkuSgmJzaLLQLyxplS9CxkEVP9l9n8eL0YmzZ5nImd0Jl5U7hlIGp4dDiOTixwZ67iNppjRmRSb8VSen0EIkWHfGUEyQ4FwRowMDUweb5uEyPCamo9wSIwMD0GNZoQ3Bhge4ZAUmRJjgBJkUoxoLev5t5McGW3ZA+dS2plAfnL8AQ0ZMulbQOZ0E0kytHDnzggaaqJguCxy7owqs/KNDJlCQKYMkMkCmTJAJgtkygCZLJApw7q+2Z7YXeYPyM+dq6pNXEiPsVN1OKn3MksSxj6AqeOdKZLZt9H71Ec8mCv3e5Mn5pb6q+M2MmpyVZ2uJbPL/Oo6r+tYFn0Iv2OzW7u85VafdK4a222WniTf7rqCNunujNM2KrGzrOg4/sOXTP+HbjRbLj5LNNhpssXYVIXW9+aF2pkt1zcGAAAAAAAAAAAAAAAAAAAAAAAAfgS/AXsli2p2NJfbAAAAAElFTkSuQmCC", // Absolute URL to image
    buttonText: "5FA5F9", // Hex color code
  }
};

export default options;
