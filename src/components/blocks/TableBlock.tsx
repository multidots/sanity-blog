import React from 'react';
import { PortableText } from 'next-sanity';
import { portableTextComponents } from '../PortableTextComponents';
import { Table, BlockContent } from '@/sanity/types';

// Type alias for cell content from Sanity Table schema
type CellContent = NonNullable<NonNullable<NonNullable<Table['rows']>[0]>['cells']>[0]['content'];

interface TableBlockProps {
  // This component can be called either:
  // 1. From PortableText with { value: Table }
  // 2. From PageBuilder with props spread directly (Table interface)
  value?: Table;
  _type?: string;
  rows?: Table['rows'];
  caption?: string;
}

const TableBlock: React.FC<TableBlockProps> = (props) => {
  // Handle both calling patterns
  const tableData = props.value || props;
  const { rows = [], caption = '' } = tableData || {};

  // Debug output (remove in production)
  console.log('TableBlock props:', props);
  console.log('TableBlock data:', tableData);

  if (!rows || rows.length === 0) {
    return <div>No table data found</div>;
  }

  const headerRows = rows.filter((row) => row.cells?.some((cell) => cell.isHeader));
  const bodyRows = rows.filter((row) => !row.cells?.some((cell) => cell.isHeader));

  const renderCellContent = (content: CellContent) => (
    Array.isArray(content) && content.length > 0
      ? <PortableText value={content as BlockContent} components={portableTextComponents} />
      : '\u00A0'
  );

  return (
    <div className='sanity-block-table'>
      <table>
        {headerRows.length > 0 && (
          <thead>
            {headerRows.map((row, rowIndex) => (
              <tr key={`h-${rowIndex}`}>
                {row.cells?.map((cell, cellIndex) => (
                  <th key={`h-${rowIndex}-${cellIndex}`}>{renderCellContent(cell.content)}</th>
                )) || []}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {(headerRows.length > 0 ? bodyRows : rows).map((row, rowIndex) => (
            <tr key={`b-${rowIndex}`}>
              {row.cells?.map((cell, cellIndex) => (
                <td key={`b-${rowIndex}-${cellIndex}`}>{renderCellContent(cell.content)}</td>
              )) || []}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <span className='table-caption'>{caption}</span>}
    </div>
  );
};

export default TableBlock;
