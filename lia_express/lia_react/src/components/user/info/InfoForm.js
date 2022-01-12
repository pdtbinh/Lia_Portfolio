import React, { useState } from 'react';
import { useRouteContext } from '../../../providers/routeProvider/RouteProvider';

export default function InfoForm(props) {

    const [state, dispatch] = useRouteContext();

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [introduction, setIntroduction] = useState();
    const [link, setLink] = useState();

    const handleName = (evt) => {
        setName(evt.target.value);
    }

    const handleIntroduction = (evt) => {
        setIntroduction(evt.target.value);
    }

    const handleLink = (evt) => {
        setLink(evt.target.value);
    }

    const reset = () => {
        setImage();
        setName();
        setIntroduction();
        setLink();
    }

    const submitProject = async (evt) => {
        evt.preventDefault();

        // FormData is the only tool to submit image
        // that has been tried and succeed.
        const data = new FormData();
        data.append("name", name);
        data.append("introduction", introduction);
        data.append("image", image);
        data.append("link", link);
        
        const fetchItem = await fetch(
            `/projects`, 
            {
                method: 'post',
                // Setting header will not transfer image
                credentials: 'include',
                body: data,
            }
        )
        const item = await fetchItem.json();
        dispatch({type: 'add_project', user: item.user});
        reset('');
    }


    return (
        <div className='ProjectForm'>
            <div>
                <label>Project name</label>
                <input onChange={handleName} type="text"/>
            </div>

            <div>
                <label>Introduction</label>
                <textarea onChange={handleIntroduction} type="text"></textarea>
            </div>

            <div>
                <label>Link</label>
                <input onChange={handleLink} type="text"/>
            </div>

            <button onClick={submitProject}>Submit</button>
        </div>
    );
}