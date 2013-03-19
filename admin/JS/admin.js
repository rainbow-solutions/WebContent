function importKoerperteile(){
var koerperteil = StackMob.Model.extend({ schemaName: 'koerperpartie'});
var Sportart = StackMob.Model.extend({ schemaName: 'sportarten'});
var Trainigsart = StackMob.Model.extend({ schemaName: 'trainingsarten'});
var Trainigsgeraet = StackMob.Model.extend({ schemaName: 'trainingsgeraete'});
var Trainings = StackMob.Model.extend({ schemaName: 'trainings'});
var Uebung = StackMob.Model.extend({ schemaName: 'uebungen'});

 $.ajax({ 
    type: 'GET', 
    url: 'import.json', 
    dataType: 'json',
    success: function (data) { 
        for (i=0; i<data.Koerperteile.length;i++){ 
        var ID = String(data.Koerperteile[i].id);
		var newsportart = new koerperteil({koerper_partie_de: data.Koerperteile[i].koerper_partie_de, koerper_partie_en: data.Koerperteile[i].koerper_partie_en, koerperpartie_id: ID});
		newsportart.create({
		success: function(model){
		console.debug("Koerperteile OK");
		},
		error: function(model,response){
		console.debug(response);
		}
		});
        };
        // Sportarten
        for (i=0; i<data.Sportarten.length;i++){ 
        var ID = String(data.Sportarten[i].id);
		var newsportart = new Sportart({sport_art_de: data.Sportarten[i].sport_art_de, sport_art_en: data.Sportarten[i].sport_art_en, sportarten_id: ID});
		newsportart.create({
		success: function(model){
		console.debug("Sportarten OK");
		},
		error: function(model,response){
		console.debug(response);
		}
		});
        };
        // Trainingsarten
        for (i=0; i<data.Trainingsarten.length;i++){ 
        var ID = String(data.Trainingsarten[i].id);
		var newtrainigsart = new Trainigsart({trainings_art_de: data.Trainingsarten[i].trainings_art_de, trainings_art_en: data.Trainingsarten[i].trainings_art_en, trainingsarten_id: ID});
		newtrainigsart.create({
		success: function(model){
		console.debug("Trainigsart OK");
		},
		error: function(model,response){
		console.debug(response);
		}
		});
        };
        // Trainigsgeraet
        for (i=0; i<data.Trainingsgeraete.length;i++){ 
        var ID = String(data.Trainingsgeraete[i].id);
		var newtrainigsgeraet = new Trainigsgeraet({trainings_geraet_de: data.Trainingsgeraete[i].trainings_geraet_de, trainings_geraet_en: data.Trainingsgeraete[i].trainings_geraet_en, trainingsgeraete_id: ID});
		newtrainigsgeraet.create({
		success: function(model){
		console.debug("Trainigsart OK");
		},
		error: function(model,response){
		console.debug(response);
		}
		});
        };
        // Uebung
        for (i=0; i<data.Uebungen.length;i++){ 
        var ID = String(data.Uebungen[i].id);
		var newuebung = new Uebung({uebung_de: data.Uebungen[i].uebung_de, uebung_en: data.Uebungen[i].uebung_en, beschreibung_de: data.Uebungen[i].beschreibung_de, beschreibung_en: data.Uebungen[i].beschreibung_en, uebungen_id: ID});
		newuebung.create({
		success: function(model){
		console.debug("Uebeung OK");
		},
		error: function(model,response){
		console.debug(response);
		}
		});
        };
        // Trainings
        for (i=0; i<data.Trainings.length;i++){ 
	        
	        console.debug("Uebeung: " + data.Trainings[i].Uebung);
	        var ID = String(data.Trainings[i].id);
	        var training = new Trainings({trainings_id: ID, bemerkung_de:data.Trainings[i].bemerkung_de, bemerkung_en:data.Trainings[i].bemerkung_en,  alter_min:parseInt(data.Trainings[i].alter_min), alter_max:parseInt(data.Trainings[i].alter_max), intensitaet_de:data.Trainings[i].intensitaet_de, intensitaet_en:data.Trainings[i].intensitaet_en, serien_de:data.Trainings[i].serien_de, serien_en:data.Trainings[i].serien_en, serien_pause_de:data.Trainings[i].serien_pause_de, serien_pause_en:data.Trainings[i].serien_pause_en, wiederholungen_de:data.Trainings[i].wiederholungen_de, wiederholungen_en:data.Trainings[i].wiederholungen_en, training_koerperpartie: data.Trainings[i].Koerperteil, training_sport_art: data.Trainings[i].Sportart, training_trainings_art: data.Trainings[i].Trainigsart, training_trainingsgeraet: data.Trainings[i].Trainigsgeraet,training_uebung: data.Trainings[i].Uebung});
			training.create({
				success: function(model) {
				var lID = model.get('trainings_id');
				var lkoerperteil = new koerperteil({ koerperpartie_id: model.get('training_koerperpartie') });
		        var ltrainigsart = new Trainigsart({ trainingsarten_id: model.get('training_trainings_art') });
		        var lsportart = new Sportart({ sportarten_id: model.get('training_sport_art') });
		        var ltrainigsgeraet = new Trainigsgeraet({ trainingsgeraete_id: model.get('training_trainingsgeraet') });
		        var luebung = new Uebung({ uebungen_id: model.get('training_uebung') });
						lkoerperteil.fetch({
				        	success:function(model){
				      					lkoerperteil.appendAndSave('koerperpartie_trainings',[lID]);
				      				},
				    				error: function(model, response) {
				      					console.debug(response);
				    				}
				        	});
				        ltrainigsart.fetch({
				        	success:function(model){
				      					ltrainigsart.appendAndSave('trainings_art_trainings',[lID]);
				      				},
				    				error: function(model, response) {
				      					console.debug(response);
				    				}
				        	});
				        ltrainigsgeraet.fetch({
				        	success:function(model){
				      					ltrainigsgeraet.appendAndSave('trainings_geraet_trainings',[lID]);
				      				},
				    				error: function(model, response) {
				      					console.debug(response);
				    				}
				        	});
				        luebung.fetch({
				        	success:function(model){
				      					luebung.appendAndSave('uebung_trainings',[lID]);
				      				},
				    				error: function(model, response) {
				      					console.debug(response);
				    				}
				        	});
				        lsportart.fetch({
				        	success:function(model){
				      					lsportart.appendAndSave('sport_art_trainings',[lID]);
				      				},
				    				error: function(model, response) {
				      					console.debug(response);
				    				}
				        	});
						},
						error: function(model, response) {
	      					console.debug(response);
	      					}
	      			});
    };
    },
    error:function (xhr, textStatus, thrownError)
                    {
                        ret_val=xhr.readyState;
                        console.debug("Fehler im Import=" + thrownError);
                    }
});
}

function getUsers(){
	var User = StackMob.Model.extend({ schemaName: 'user'});
	var Users = StackMob.Collection.extend({ model: User});
	var myUsers = new Users();
	myUsers.fetch({
		success: function (collection){
		var data = myUsers.toJSON();
		$(document).ready(function() {
		$('#Users').html( '<table cellpadding="0" cellspacing="5px" border="0" class="display" id="UserTable"></table>' );
		$('#UserTable').dataTable( {
			"aaData": data,
			"bJQueryUI": true,
	        "sPaginationType": "full_numbers",
	        aoColumnDefs: [
	                       {
	                         sDefaultContent: '',
	                         aTargets: [ '_all' ]
	                       }
	                     ],
			"aoColumns": [
	            { "mData": "username", "sTitle": "Benutzername" },
	            { "mData": "alias", "sTitle": "Alias" },
	            { "mData": "administrator", "sTitle": "Administrator" },
	        ]
		} );	
	} );
		},
		error: function (model,response){
		window.debug(response);
		}
		});
}