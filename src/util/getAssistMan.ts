export function getAssistMan(g: Game): number {
    ratios = list()
    if g.game_state == GameState.half_court:
        ratios = [p.rating('halfcourt_usage') for p in g.teams[g.o]._lineup]
    else:
        ratios = [p.rating('fastbreak_usage') for p in g.teams[g.o]._lineup]
    assist_man = pick_player(ratios, 4)
    return assist_man
}