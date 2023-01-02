class Category {
    total
    f_half
    s_half
    corners
    cards
    fouls
    shotsOnTarget
    shots
    goalKicks
    saves
    offsides
    throwIn
    tackles

    getPrimary(){
        return [
            this.corners,
            this.cards,
            this.fouls,
            this.shotsOnTarget,
            this.shots,
            this.goalKicks,
            this.saves,
            this.offsides,
            this.throwIn,
            this.tackles
        ]
    }

    getSecondary(){
        return [
            this.total,
            this.f_half,
            this.s_half
        ]
    }

    getF_halfSubOdds(){
        return []
    }

    getS_halfSubOdds(){
        return []
    }
    getCornersSubOdds(){
        return [this.f_half,this.s_half,this.total]
    }

    getCardsOdds(){
        return [this.f_half,this.s_half,this.total]
    }
    getFoulsSubOdds(){
        return [this.f_half,this.s_half,this.total]
    }
    getShotsOnTargetSubOdds(){
        return [this.f_half,this.s_half,this.total]
    }

    getGoalKicksSubOdds(){
        return [this.f_half,this.s_half,this.total]
    }

    getOffsidesSubOdds(){
        return [this.f_half,this.s_half,this.total]
    }

    getThrowInSubOdds(){
        return [this.f_half,this.s_half,this.total]
    }

    getTacklesSubOdds(){
        return [this.f_half,this.s_half,this.total]
    }
}

let dumanbetCatagory = new Category();
dumanbetCatagory.total = 'regular'
dumanbetCatagory.f_half = '1st half';
dumanbetCatagory.s_half = '2nd half';
dumanbetCatagory.corners = 'corners';
dumanbetCatagory.cards = 'cards';
dumanbetCatagory.fouls = 'fouls';
dumanbetCatagory.shotsOnTarget = 'shots on target';
dumanbetCatagory.shots = 'shots';
dumanbetCatagory.goalKicks = 'goal kicks';
dumanbetCatagory.saves = 'saves';
dumanbetCatagory.offsides = 'Offsides';
dumanbetCatagory.throwIn = 'Throw-In';
dumanbetCatagory.tackles = 'Tackles';



let betWinnerCategory = new Category();
betWinnerCategory.f_half = ''
betWinnerCategory.f_half = '1 Half';
betWinnerCategory.s_half = '2 Half';
betWinnerCategory.corners = 'corners';
betWinnerCategory.cards = 'cards';
betWinnerCategory.fouls = 'fouls';
betWinnerCategory.shotsOnTarget = 'shots on target';
betWinnerCategory.shots = 'shots';
betWinnerCategory.goalKicks = 'goal kicks';
betWinnerCategory.saves = 'saves';
betWinnerCategory.offsides = 'Offsides';
betWinnerCategory.throwIn = 'Throw-ins';
betWinnerCategory.tackles = 'Tackles';


export default {betWinnerCategory,dumanbetCatagory}