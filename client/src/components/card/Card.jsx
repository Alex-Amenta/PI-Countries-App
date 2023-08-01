import styles from './Card.module.css';

const Card = (props) => {
    return ( 
        <div className={styles.container}>
        <img src={props.flag}/>
        <h2>{props.name}</h2>
        <p>Continent: {props.continent}</p>
        </div>
     );
}
 
export default Card;