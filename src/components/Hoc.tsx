import "./Hoc.css"
import {useState} from 'react';
import { v4 } from "uuid";

type TypeProps = {
    date: string;
    url?: string;
}

function withPrettyDate(WrappedComponent: React.ComponentType<TypeProps>) {
    return function DateTimePretty(props: TypeProps) {
        const formatDate = (dateString: string): string => {
            const now = new Date();
            const date = new Date(dateString);
            const diff = now.getTime() - date.getTime();
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (seconds < 60) {
                return `${seconds} секунд назад`;
            } else if (minutes < 60) {
                return `${minutes} минут назад`;
            } else if (hours < 24) {
                return `${hours} часов назад`;
            } else {
                return `${days} дней назад`;
            }
        }

        return (
            <WrappedComponent {...props} date={formatDate(props.date)} />
        );
    }
}

function DateTime(props: TypeProps) {
    return (
        <p className="date">{props.date}</p>
    );
}

const DateTimePretty = withPrettyDate(DateTime);

function Video(props: TypeProps) {
    return (
        <div className="video">
            <iframe src={props.url} allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

type TypeVideoList = {
    list: TypeProps[]
}

function VideoList(props: TypeVideoList) {
    return props.list.map(item => <Video key={v4()} url={item.url} date={item.date} />);
}

export default function Hoc() {
    const [list] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}