
import Header from "@/app/header";
import Footer from "@/app/footer";
import { HEADER_QUERY, FOOTER_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERYResult } from "@/sanity/types";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const headerData = await client.fetch(HEADER_QUERY);
    const footerData: FOOTER_QUERYResult = await client.fetch(FOOTER_QUERY);

    return (    
        <div>
            <Header {...headerData} />
            {children}
            {footerData?.footer && <Footer footer={footerData.footer} />}
        </div>
    );
}