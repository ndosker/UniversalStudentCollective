$("document").ready(function() {

    $('#mealMenu').click(function () {
        $('#eventsTab, #goodsTab, #petsTab, #ridesTab').hide();
        $('#mealTab').show();
        return false;
    });

    $('#eventsMenu').click(function () {
        $('#mealTab, #goodsTab, #petsTab, #ridesTab').hide();
        $('#eventsTab').show();
        return false;
    });

    $('#goodsMenu').click(function () {
        $('#mealTab, #eventsTab, #petsTab, #ridesTab').hide();
        $('#goodsTab').show();
        return false;
    });

    $('#petsMenu').click(function () {
        $('#mealTab, #goodsTab, #eventsTab , #ridesTab').hide();
        $('#petsTab').show();
        return false;
    });

    $('#ridesMenu').click(function () {
        $('#mealTab, #goodsTab, #petsTab, #eventsTab').hide();
        $('#ridesTab').show();
        return false;
    });

});