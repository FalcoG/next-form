import styles from "@/app/page.module.css";
import { ApplicationProcess } from '@/app/form/application/application-process'

export default async function FormPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        main
        <pre>
          {JSON.stringify(slug, null, 2)}
        </pre>
        <ApplicationProcess />
      </main>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
}
