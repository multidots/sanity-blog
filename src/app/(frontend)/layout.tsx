
import Header from "@/app/header";
import Footer from "@/app/footer";
import { HEADER_QUERY, FOOTER_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const headerData = await client.fetch(HEADER_QUERY);
    const footerData = await client.fetch(FOOTER_QUERY);

    return (    
        <div>
            <Header {...headerData} />
            {children}
            {/* {footerData && <Footer footer={footerData} />} */}
        </div>
    );
}