import css from './Loader.module.css';
import { DNA } from 'react-loader-spinner';

export default function Loader() {
  return (
    <DNA
      visible={true}
      height="180"
      width="180"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass={css.loader}
    />
  );
}
