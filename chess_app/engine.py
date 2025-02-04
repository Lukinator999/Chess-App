import chess

def evalPosition(board):
    count = 0.0
    # checkmate
    if board.outcome() != None:
        if board.outcome().result() == "1-0":
            count -= 999
        elif board.outcome().result() == "0-1":
            count += 999
    # get king position
    for square, piece in board.piece_map().items():
        if piece.symbol() == 'K':
            w_king_position = chess.square_name(square)
    for square, piece in board.piece_map().items():
        if piece.symbol() == 'k':
            b_king_position = chess.square_name(square)
    if board.outcome() != None:
        if w_king_position[1] == "1":
            count -= 0.5
        if b_king_position[1] == "8":
            count += 0.5
    for square in chess.SQUARES:
        piece = board.piece_at(square)
        if piece:
            # possible moves of players
            square = chess.square_name(square)
            legal_moves = list(board.legal_moves)
            moves = [move.uci() for move in legal_moves]
            square_moves = [move for move in moves if move[:2] == square]
            square_fields1 = [field[2:4] for field in square_moves]
            board.turn = not board.turn
            legal_moves = list(board.legal_moves)
            moves = [move.uci() for move in legal_moves]
            square_moves = [move for move in moves if move[:2] == square]
            square_fields2 = [field[2:4] for field in square_moves]
            square_fields = square_fields1 + square_fields2
            board.turn = not board.turn
            piece = piece.symbol()
            if piece.upper() == piece:
                count -= len(square_fields)/14
            else:
                count += len(square_fields)/14
            # WHITE
            # rooks
            if piece == "R":
                count -= 5
                if b_king_position[1] == square[1] or b_king_position[0] == square[0]:
                    count -= 0.3
            # knights
            elif piece == "N":
                count -= 3
                if int(square[1]) >= 3:
                    count -= 0.5
                if "c" <= square[0] <= "f":
                    count -= 0.5
            # bishops
            elif piece == "B":
                count -= 3
                if int(square[1]) >= 3:
                    count -= 0.5
            # queens
            elif piece == "Q":
                count -= 9
                if b_king_position[1] == square[1] or b_king_position[0] == square[0]:
                    count -= 0.3
            # pawns
            elif piece == "P":
                count -= 1
                count -= int(square[1])/2
            # king
            elif piece == "K":
                if int(square[1]) == 1:
                    count -= 0.5
            # BLACK
            # rooks
            elif piece == "r":
                count += 5
                if w_king_position[1] == square[1] or w_king_position[0] == square[0]:
                    count += 0.3
            # knights
            elif piece == "n":
                count += 3
                if int(square[1]) <= 6:
                    count += 0.5
                if "c" <= square[0] <= "f":
                    count += 0.5
            # bishops
            elif piece == "b":
                count += 3
                if int(square[1]) <= 6:
                    count += 0.5
            # queens
            elif piece == "q":
                count += 9
                if w_king_position[1] == square[1] or w_king_position[0] == square[0]:
                    count += 0.3
            # pawns
            elif piece == "p":
                count += 1
                count += abs(int(square[1])-9)/2
            # king
            elif piece == "K":
                if int(square[1]) == 1:
                    count += 0.5
    return count

def bestMove(board_fen):
    board = chess.Board(board_fen)
    legal_moves = list(board.legal_moves)
    best_score = -float('inf')
    best_move = None
    
    for move in legal_moves:
        newBoard = board.copy()
        newBoard.push(move)
        opponent_best_score = float('inf')
        
        # worst result for opponent
        for new_move in newBoard.legal_moves:
            newnewBoard = newBoard.copy()
            newnewBoard.push(new_move)
            score = evalPosition(newnewBoard)
            
            if score < opponent_best_score:
                opponent_best_score = score
        
        opponent_best_score -= len(board.attackers(chess.WHITE, chess.parse_square(move.uci()[2:4])))
        opponent_best_score += len(board.attackers(chess.BLACK, chess.parse_square(move.uci()[2:4])))
        # new minimax value
        if opponent_best_score > best_score:
            best_score = opponent_best_score
            best_move = move
    return best_move