import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

//alter
export const alert = (title, text, icon, callback) => {
   MySwal.fire({
      title: title,
      text: text,
      icon: icon,
   })
   .then( callback )
}

//confirm
export const confirm = (title, text, icon, callback) => {
   MySwal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "blue",
      confirmButtonText: "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
   })
   .then(callback);
}