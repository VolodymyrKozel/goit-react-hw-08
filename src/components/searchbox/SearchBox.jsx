import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter } from '../../redux/selectors';
import { changeFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';
const SearchBox = () => {
  const nameFilter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  return (
    <div>
      <label className={css['label']} htmlFor="search">
        Find contact by Name
      </label>
      <input
        className={css['input']}
        type="text"
        name="search"
        id="search"
        placeholder="search ..."
        value={nameFilter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBox;
