import type { Metadata } from "next";
import styles from "../admin.module.css";

export const metadata: Metadata = {
  title: "Admin sign in | The Paradise of the Fathers",
  robots: { index: false, follow: false },
};

const signInHref = "/admin/login/start/";

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
          This first clears any previous session. Secure sign-in is handled by
          ChatGPT; choose “Continue with Google” on the next screen.
        </small>
      </section>
    </main>
  );
}
