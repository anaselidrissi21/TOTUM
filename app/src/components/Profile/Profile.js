import { useState, useEffect } from 'react';
import axios from '../../utils/axiosPool';

// base page
import './profile.scss';

function Profile({ props, funct }) {
  const userId = localStorage.getItem('id');
  const [user, setUser] = useState([]);
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const nowISO = props.timeNow;

  const checkDate = (date) => {
    if (date < nowISO) {
      return 'past';
    }
    return 'future';
  };

  const getUserById = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/manage`,
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUserActivities = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `/user/${id}/activity`,
      });
      setActivities(response.data);
    } catch (error) {
      setActivities([
        {
          id: 404,
          name: 'Aucune activité',
        },
      ]);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('/category/categories');
      setCategories(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getUserById(userId);
    getCategories();
  }, []);

  useEffect(() => {
    getUserActivities(userId);
  }, [props.profile]);

  const ListActivities = () => (
    <article className='listActivities_panel'>
      <ul className='activities-list'>
        {activities.map((activity, i) => {
          if (activity.id !== 404) {
            console.log(activity);
            return (
              <li
                key={i}
                className={`activity panel-block ${checkDate(
                  activity.activity_date,
                )}`}
                onClick={() => funct.handleActivity(activity.id)}>
                <div className='column profil-picture'>
                  {/* phto de profil */}
                </div>

                <div className='column activity-name'>
                  {activity.activity_name}
                </div>

                <div className='column activity-category'>
                  {activity.category_name}
                </div>

                <div className='column activity-city'>
                  {/* ville activité */}
                </div>

                <div className='column activity-date'>
                  {/* date activité std fr */}
                </div>

                <div className='column activity-level'>
                  {activity.level_name}
                </div>
              </li>
            );
          }
          return (
            <li key={activity.id} className='activity panel-block'>
              <div className='column activity-name'>{activity.name}</div>
            </li>
          );
        })}
      </ul>
    </article>
  );

  return (
    <section className='profil_card'>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='avatar image is-128x128'>
              <img
                className='is-rounded'
                src='https://i.picsum.photos/id/779/200/200.jpg?hmac=qClHBmnKwT7Xt6flSVOh5Ax0tWLRo_gLVmwd4dkSVAo'
                alt='profile'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='profile-name title is-4'>
              {user.firstname} {user.lastname}
            </p>
            <p className='profile-presentation content'>
              {user.about === '' ? 'Aucune présentation' : user.about}
            </p>
          </div>
        </div>
      </div>

      <div className='profile-activities'>
        <ListActivities />
      </div>
    </section>
  );
}

export default Profile;
