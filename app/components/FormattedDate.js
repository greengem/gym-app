import { parseISO, format } from 'date-fns';

export default function FormattedDate({ dateString }) {
    if (!dateString) {
        return null;
    }
    const date = (dateString instanceof Date) ? dateString : parseISO(dateString);
    const formattedDate = format(date, 'LLLL d, yyyy');

    return <time dateTime={dateString}>{formattedDate}</time>;
}
