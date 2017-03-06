/**
 * Created by German on 5/3/2017.
 */
angular.module('mascotasApp')
  .value('version', '0.1')


  .factory('Service', [
    function () {

      return {

        getMascotas: function () {
          var mascotas = [
            {
              id: '0',
              nombre: 'Juani',
              situacion: 'Perdida',
              tipo: 'Perro',
              fecha: '04/03/2017',
              foto: null,
              fotoContentType: null,
              coords: {
                latitude: '-31.6354346',
                longitude: '-60.7051804'
              },
              options: {
                draggable: false,
                icon: "/images/icons/perdida.png"
              },
            },
            {
              id: '1',
              nombre: 'Tito',
              situacion: 'Encontrada',
              tipo: 'Gato',
              fecha: '04/03/2017',
              foto: null,
              fotoContentType: null,
              coords: {
                latitude: '-31.6406006',
                longitude: '-60.6747256'
              },
              options: {
                draggable: false,
                icon: "/images/icons/encontrada.png"
              },
            },
            {
              id: '2',
              nombre: 'Teo',
              situacion: 'Perdida',
              tipo: 'Perro',
              fecha: '04/03/2017',
              foto: null,
              fotoContentType: null,
              coords: {
                latitude: '-31.6198214',
                longitude: '-60.6960941'
              },
              options: {
                draggable: false,
                icon: "/images/icons/perdida.png"
              },
            },
            {
              id: '3',
              nombre: 'Renata',
              situacion: 'Perdida',
              tipo: 'Perro',
              fecha: '04/03/2017',
              foto: null,
              fotoContentType: null,
              coords: {
                latitude: '-31.6566568',
                longitude: '-60.71113149'
              },
              options: {
                draggable: false,
                icon: "/images/icons/perdida.png"
              },
            }
          ]




          return mascotas;
        },

        getTipos: function () {
          var tipos = [
              "Perro", "Gato", "Loro", "Conejo", "Otros"
            ];

          return tipos;
        },

        getSituaciones: function () {
          var situaciones =  [
              "Perdida", "Encontrada"
          ];

          return situaciones;
        }


      }

    }]);
