import { Card, type CardComponent } from './Card';
import { Header } from './Header';
import { Body } from './Body';
import { Footer } from './Footer';
import { Group } from './Group';
import { BodyImage } from './Media/BodyImage';
// import { TableRow } from './TableRow';
// import { TableCell } from './TableCell';
// import { TableHeaderCell } from './TableHeaderCell';
// import { TableSortableHeaderCell } from './TableSortableHeaderCell';

// Attach subcomponents
// const CompTable = Table as TableComponent;
const CompCard = Card as CardComponent;

CompCard.Header = Header;
CompCard.Body = Body;
CompCard.Footer = Footer;
CompCard.Group = Group;
CompCard.Image = BodyImage;
// CompTable.Row = TableRow;
// CompTable.Cell = TableCell;
// CompTable.HeaderCell = TableHeaderCell;
// CompTable.SortableHeaderCell = TableSortableHeaderCell;

export { CompCard };
