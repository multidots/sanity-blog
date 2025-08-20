import { PortableText, PortableTextBlock } from "next-sanity";
import { portableTextComponents } from "../PortableTextComponents";

type HighlightBlockProps = {
    highlightText?: PortableTextBlock[] | string;
    bgColor?: {
        hex?: string;
    } | null;
    textColor?: {
        hex?: string;
    } | null;
}

export default function HighlightBlock({ highlightText, bgColor, textColor }: HighlightBlockProps) {
    const style: React.CSSProperties = {
        backgroundColor: bgColor?.hex,
        color: textColor?.hex,
    };

    return (
        <div className="highlight-block" style={style}>
            {Array.isArray(highlightText) ? (
                <PortableText value={highlightText} components={portableTextComponents} />
            ) : typeof highlightText === 'string' ? (
                <p>{highlightText}</p>
            ) : null}
        </div>
    )
}