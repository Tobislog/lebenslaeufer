import { useState } from 'react';
import TextInput from './TextInput.jsx';
import Button from './Button.jsx';
import '../styles/EducationSection.css';

// Helper-Function for Education-Item
function EducationItem ({item, onChange, onDelete, disabled}) {
    return (
        <div className="educationItem">
            <TextInput
                label="School Name"
                value={item.school}
                onChange={(e) => onChange(item.id, 'school', e.target.value)}
                disabled={disabled}
            />
            <TextInput
                label="Title of Study"
                value={item.title}
                onChange={(e) => onChange(item.id, 'title', e.target.value)}
                disabled={disabled}
            />
            <TextInput
                label="Beginn"
                value={item.startDate}
                type="date"
                onChange={(e) => onChange(item.id, 'startDate', e.target.value)}
                disabled={disabled}
            />
            <TextInput
                label="Ende"
                value={item.endDate}
                type="date"
                onChange={(e) => onChange(item.id, 'endDate', e.target.value)}
                disabled={disabled}
            />
            {!disabled && (
                <button type="button" onClick={() => onDelete(item.id)}>
                    Löschen
                </button>
            )}
        </div>
    )
}


function EducationSection ({initialData, onSave}) {
    const [draftList, setDraftList] = useState(initialData);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (id, field, value) => {
        setDraftList(prev => 
            prev.map(item => (item.id === id ? {...item, [field]: value} : item))
        );
    };

    const handleAdd = () => {
        const newItem = {
            id: crypto.randomUUID(),
            school: '',
            title: '',
            startDate: '',
            endDate: ''
        };
        setDraftList(prev => [...prev, newItem]);
    };

    const handleDelete = (id) => {
        setDraftList(prev => prev.filter(item => item.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSaved){
            setIsSaved(false);
        } else {
            onSave(draftList);
            setIsSaved(true);
        }
    };

    return (
        <section className="formSection">
            <h2>
                Educational Experiences
                {!isSaved && (
                    <button type="button" onClick={handleAdd} id="addEduButton">
                        +
                    </button>
                )}
            </h2>
            <form onSubmit={handleSubmit}>
                {draftList.map(item => (
                    <EducationItem
                        key={item.id}
                        item={item}
                        onChange={handleChange}
                        onDelete={handleDelete}
                        disabled={isSaved}
                    />
                ))}
                
                <Button text={isSaved ? "Edit" : "Save"} type="submit" />
            </form>
        </section>
    )

}

export default EducationSection;
