var app = angular.module("gameProject", [])
app.controller("GameController", ['$scope', '$timeout' ,function($scope, $timeout){
    //$scope.demo = "Hello Peer!";
    var words=["Altassian","Remember","Mountain","Pokemon"];
    $scope.incorectLetterChosen=[];
    $scope.corectLetterChosen=[];
    $scope.guesses = 6;
    $scope.displayWord = '';
    $scope.input = {
        letter : ''
    }

    var selectedRadomWord = function() {
        var index = Math.round(Math.random()*words.length);
        return words[index]
    }
    
    var newGame = function() {
        $scope.incorectLetterChosen=[];
        $scope.corectLetterChosen=[];
        $scope.guesses = 6;
        $scope.displayWord = '';

        selectedWord = selectedRadomWord();
        console.log(selectedWord);

        var tempDisplayWord = '';
        for(var i=0;i<selectedWord.length;i++) {
			tempDisplayWord+='*';
		}
		$scope.displayWord=tempDisplayWord;
        console.log(tempDisplayWord)
    }

    $scope.letterChosen = function() {
        console.log("Trabalhando!");
        for (var i = 0; i < $scope.corectLetterChosen.length; i++) {
            if ($scope.corectLetterChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
                $scope.input.letter="";
                return;
            }
        }

        for (var i=0; i < $scope.incorectLetterChosen.length; i++) {
            if ($scope.incorectLetterChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
                $scope.input.letter="";
            }
        }

        var correct = false;
        for (var i = 0; i < selectedWord.length; i++) {
            if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()) {
                $scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
                correct=true;
            }
        }
        if (correct) {
            $scope.corectLetterChosen.push($scope.input.letter.toUpperCase());
        } else {
            $scope.guesses--;
            $scope.incorectLetterChosen.push($scope.input.letter.toUpperCase());
        }
        $scope.input.letter = ""
        if($scope.guesses===0) {
            $timeout(function() {
                newGame();
            }, 500)
        }

        if($scope.displayWord.indexOf("*")==-1) {
            $timeout(function() { newGame() }, 500);
        }
    }
    newGame();
   
}])