from django.shortcuts import render, redirect
from django.http import JsonResponse
import chess

# Create your views here.
def home(request):
    return render(request, "index.html")

def game(request, rat):
    # Save board
    if 'board_fen' in request.session:
        board = chess.Board(request.session['board_fen'])
    else:
        board = chess.Board()
    # return legal moves
    if request.method == 'POST' and request.POST.get('is_legalmove_request', None):
        square = request.POST.get('square')
        legal_moves = list(board.legal_moves)
        moves = [move.uci() for move in legal_moves]
        square_moves = [move for move in moves if move[:2] == square]
        square_fields = [field[2:4] for field in square_moves]
        return JsonResponse({'moves': square_fields})
    # move piece
    if request.method == 'POST' and request.POST.get('is_move_request', None):
        square = request.POST.get('square')
        piece = request.POST.get('piece')
        move = chess.Move.from_uci(piece + square)
        if move in board.legal_moves:
            san = board.san(move)
            if "-" in san:
                if len(san.split("-")) == 2:
                    special = "short"
                elif len(san.split("-")) == 3:
                    special = "long"
            if "=" in san:
                special = "promotion" + san.split("-")[-1]
            board.push(move)
            request.session['board_fen'] = board.fen()
            print(board)
            outcome = board.outcome()
            outcome_dict = {
                'outcome': None if outcome is None else outcome.result(),
                'special': san
            }
            return JsonResponse(outcome_dict)
        else:
            return JsonResponse({'error': 'illegal move'}, status=400)
    
    request.session['board_fen'] = board.fen()
    return render(request, "game.html")