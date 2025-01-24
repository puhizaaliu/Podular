import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

function Merch() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [storedValues, setStoredValues] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCreatorId(user.uid);
            } else {
                navigate('creators/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const storage = getStorage();

    const saveDataToFirestore = async () => {
        try {
            if (!image) {
                setError('Please select an image');
                return;
            }

            const storageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(storageRef);

            const docRef = await addDoc(collection(db, "merch"), {
                name: name,
                description: description,
                price: parseFloat(price),
                creator_id: creatorId,
                image: downloadURL,
                quantity: parseInt(quantity),
            });
            alert("Document written to database with ID: " + docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
            if (e.code === 'permission-denied') {
                setError("You do not have permission to perform this action.");
            } else {
                setError("An error occurred while adding the document.");
            }
        }
    };

    const fetchDataFromFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "merch"));
            const temporaryArr = [];
            querySnapshot.forEach((doc) => {
                temporaryArr.push(doc.data());
            });
            setStoredValues(temporaryArr);
        } catch (e) {
            console.error("Error fetching documents: ", e);
            setError("An error occurred while fetching the documents.");
        }
    };

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Save merch to database</h4>
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
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    placeholder="Image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <div className="mb-3">
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <button onClick={saveDataToFirestore} className='btn btn-success mx-3'>Save</button>
                            <button onClick={fetchDataFromFirestore} className='btn btn-secondary'>Fetch</button>

                            <div>
                                <h2>stored values</h2>
                                <ul>
                                {storedValues.map((item, index) => (
                                    <li key={index}>
                                        Product Name: {item.name}, Description: {item.description}
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Merch;
