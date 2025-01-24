import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function Test() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const saveDataToFirestore = async () => {
        try {
            if (!name || !surname) {
                setError('Please fill in both fields');
                return;
            }

            const docRef = await addDoc(collection(db, "test"), {
                name: name,
                surname: surname,
            });
            setSuccessMessage("Document written to database with ID: " + docRef.id);
            setError('');
            setName('');
            setSurname('');
        } catch (e) {
            console.error("Error adding document: ", e);
            setError("An error occurred while adding the document.");
            setSuccessMessage('');
        }
    };

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Save data to test collection</h4>
                        <div className='card-body'>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            <button onClick={saveDataToFirestore} className='btn btn-success mx-3'>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;
