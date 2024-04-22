import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter } from '../../redux/contacts/selectors';
import { changeFilter } from '../../redux/filters/slice';
import css from './SearchBox.module.css';
const SearchBox = () => {
  const nameFilter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  return (
    <div>
      <label className={css['label']} htmlFor="search">
        Find contact
      </label>
      <input
        className={css['input']}
        type="text"
        name="search"
        id="search"
        placeholder="type here"
        value={nameFilter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBox;
