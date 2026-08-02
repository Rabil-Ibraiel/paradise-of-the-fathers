import type { Metadata } from "next";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: "Admin sign in | The Paradise of the Fathers",
  robots: { index: false, follow: false },
};

const signInHref = "/signin-with-chatgpt?return_to=%2Fadmin%2F";
const switchAccountHref = "/signout-with-chatgpt?return_to=%2Fadmin%2Flogin%2F";

export default function AdminLoginPage() {
  return (
    <main className={styles.loginPage} lang="en" dir="ltr" data-no-translate>
      <section>
        <span lang="syr" dir="rtl">ܦܪܕܝܣܐ ܕܐܒܗ̈ܬܐ</span>
        <p>Private editorial desk</p>
        <h1>Continue with your Google account.</h1>
        <p>
          Access is granted only when the secure sign-in returns
          <strong> rabilabrail@gmail.com</strong>.
        </p>
        <a className={styles.googleButton} href={signInHref}>Continue with Google</a>
        <small>
          Secure sign-in is handled by ChatGPT. Choose “Continue with Google”
          on the next screen.
        </small>
        <a className={styles.switchAccount} href={switchAccountHref}>Sign out and use another account</a>
      </section>
    </main>
  );
}
