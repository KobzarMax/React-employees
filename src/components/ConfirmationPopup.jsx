import { faL } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';

export const ConfirmationPopup = ({ isOpen, onCancel, onConfirm, project, onUpdateProjects }) => {
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(0);

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleDelete = () => {
    const data = {
      user_id: project.user_id,
      project_name: project.name,
      summary: summary,
      rating: rating
    };

    axios
      .post('http://localhost:3000/summaries', data)
      .then(() => {
        onConfirm();
      })
      .catch((error) => {
        console.log(error);
      });
      onCancel();
      onUpdateProjects();
  };

  return (
    <>
      {isOpen ? (
        <div className="popup">
          <div className="popup-inner">
            <h2 className='welcome'>Are you sure you want to delete this project?</h2>
            <div className="confirmation">
              <div className="form-group">
                <label htmlFor="summary">Summary:</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={summary}
                  onChange={handleSummaryChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={handleRatingChange}
                />
              </div>
              <div className="form-actions">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={handleDelete}>Close Project</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
