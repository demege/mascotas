'use strict';

/**
 * @ngdoc function
 * @name mascotasApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mascotasApp
 */
angular.module('mascotasApp')
  .controller('MainCtrl', function ($scope, $interval, DataUtils, $timeout, uibDatepickerConfig, $rootScope,Service) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isOpen = false;
    $scope.demo = {
      isOpen: false,
      count: 0,
      selectedDirection: 'rigth'
    };

    /*Selects Options*/
    $scope.situaciones = Service.getSituaciones();
    $scope.situacionElegida = $scope.situaciones[0];

    $scope.tipos = Service.getTipos();
    $scope.tipoElegido = $scope.tipos[0];

    /*Google Maps*/
    $scope.map = {center: {latitude: 0, longitude: 0}, zoom: 8};
    $scope.marker = {
      markersEvents: {
        click: function (marker, eventName) {
          /*Evento que llama al metodo que abre pop up para ver mascota*/
          $scope.abrirPopUpVerMascota(marker.key);
        }
      }
    };

    /*Limpio variable utilizada para dar de alta mascotas*/
    $scope.clearMascota = function () {
      $rootScope.nuevaMascota = {
        id: '',
        nombre: '',
        fecha: new Date(),
        situacion: $scope.situaciones[0],
        tipo: $scope.tipos[0],
        foto: null,
        fotoContentType: null,
        coords: {
          latitude: '',
          longitude: ''
        },
        options: {
          draggable: false,
          icon: "/images/icons/perdida.png"
        },
      };
    };
    $scope.clearMascota();

    $scope.mascotas = Service.getMascotas();

    $scope.detectarUbicacion = function () {
      $scope.errorValidacion = false;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          $scope.map = {center: {latitude: pos.lat, longitude: pos.lng}, zoom: 14};
          $scope.$apply();
        });
      }
      else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
      }
    };
    $scope.detectarUbicacion();


    /*Abre pop up para dar de alta mascota*/
    $scope.abrirPopUpAltaMascota = function () {
      $scope.clearMascota();
      $('#nuevaMascotaModal').modal('show');

    };

    /*Abre pop up para ver mascota*/
    $scope.abrirPopUpVerMascota = function (indice) {
      $scope.verMascota = {};
      $scope.verMascota = $scope.mascotas[indice];
      $('#verMascotaModal').modal('show');

    };

    $scope.openInfoWindow = function (e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }


    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    /*Guarda mascota en lista de mascotas*/
    $scope.altaMascota = function (mascota) {

      mascota.id = $scope.mascotas.length;

      /*Formateo fecha*/
      var day = mascota.fecha.getDate();
      var monthIndex = mascota.fecha.getMonth();
      var year = mascota.fecha.getFullYear();
      mascota.fecha = day + '/' + monthIndex + '/' + year;

      /*Seteo icon marker*/
      mascota.options.icon = "/images/icons/" + mascota.situacion.toLowerCase() + ".png";

      obtenerLatitudLongitud(mascota);

      $scope.mascotas.push(mascota);

      $('#nuevaMascotaModal').modal('toggle');

    };

    /*Mediante formula obtengo coordenadas aleatorias en un rango de 3 km*/
    function obtenerLatitudLongitud(mascota) {
      var lat = $scope.map.center.latitude + (getRandomArbitrary(-1, 1) / 30);
      var lng = $scope.map.center.longitude + (getRandomArbitrary(-1, 1) / 30);

      if (getDistance($scope.map.center.latitude, $scope.map.center.longitude, lat, lng) <= 3000) {
        mascota.coords.latitude = lat;
        mascota.coords.longitude = lng;

        return;
      }
      obtenerLatitudLongitud(mascota);
    };

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    //Dstancia calculada matemáticamente
    var rad = function (x) {
      return x * Math.PI / 180;
    };
    var getDistance = function (p1lat, p1lng, p2lat, p2lng) {
      var R = 6378137; // Earth�s mean radius in meter
      var dLat = rad(p2lat - p1lat);
      var dLong = rad(p2lng - p1lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    };

    /*Fechas*/
    $scope.datePickerOpenStatus = {};
    $scope.openCalendar = openCalendar;
    $scope.byteSize = DataUtils.byteSize;
    $scope.openFile = DataUtils.openFile;
    $scope.datePickerOpenStatus.fecha = false;
    function openCalendar(date) {
      $scope.datePickerOpenStatus[date] = true;
    }
    $scope.fechaDesdeModal = function () {
      $scope.fechaDModal.opened = true;
    };
    $scope.fechaDModal = {
      opened: false
    };
    //DatePicker
    $scope.formatD = 'dd/MM/yyyy';

    /*File upload*/
    $scope.setFoto = function ($file, mascota) {
      if ($file && $file.$error === 'pattern') {
        return;
      }
      if ($file) {
        DataUtils.toBase64($file, function (base64Data) {
          $scope.$apply(function () {
            mascota.foto = base64Data;
            mascota.fotoContentType = $file.type;
          });
        });
      }
    };

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }





  });
