"use client"
import { useState, useEffect } from "react";

export default function APITestPage(){
    const [name, setName] = useState<string>();

    useEffect(() => {
        fetch("/api/whoAmI")
            .then((res) => res.json())
            .then((data) => setName(data.name));
    }, []);

    return (
        <div>
            <div>
                API Route From <strong>Client</strong>
            </div>
            <div>Name: {name}</div>
        </div>
    );
}
