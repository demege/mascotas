/**
 * Created by German on 5/3/2017.
 */
(function() {
  'use strict';

  angular
    .module('mascotasApp')
    .factory('MascotasUtils',

  function () {

    function getMascotas(){
      var mascotas = [
        {
          id: '0',
          nombre: 'Juani',
          imagen: '',
          situacion: 'Perdida',
          tipo: 'Perro',
          fecha: '04/03/2017',
          foto: null,
          fotoContentType: null,
          coords: {
            latitude: '-31.6354346',
            longitude: '-60.7051804'
          }
        }
      ];
      return mascotas;
    }


  })
})();
