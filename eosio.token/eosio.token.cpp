/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include "eosio.token.hpp"

namespace eosio {

void token::create( account_name issuer,
                    asset        maximum_supply )
{
    require_auth( _self );

    auto sym = maximum_supply.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( maximum_supply.is_valid(), "invalid supply");
    eosio_assert( maximum_supply.amount > 0, "max-supply must be positive");

    stats statstable( _self, sym.name() );
    auto existing = statstable.find( sym.name() );
    eosio_assert( existing == statstable.end(), "token with symbol already exists" );

    statstable.emplace( _self, [&]( auto& s ) {
       s.supply.symbol = maximum_supply.symbol;
       s.max_supply    = maximum_supply;
       s.issuer        = issuer;
    });
}


void token::issue( account_name to, asset quantity, string memo )
{
    auto sym = quantity.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    auto sym_name = sym.name();
    stats statstable( _self, sym_name );
    auto existing = statstable.find( sym_name );
    eosio_assert( existing != statstable.end(), "token with symbol does not exist, create token before issue" );
    const auto& st = *existing;

    require_auth( st.issuer );
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must issue positive quantity" );

    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

    statstable.modify( st, 0, [&]( auto& s ) {
       s.supply += quantity;
    });

    add_balance( st.issuer, quantity, st.issuer );

    if( to != st.issuer ) {
       SEND_INLINE_ACTION( *this, transfer, {st.issuer,N(active)}, {st.issuer, to, quantity, memo} );
    }
}

void token::burn(asset quantity, string memo )
{
    eosio::print("### BURN ###\n\n");
    auto sym = quantity.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio::print("*** O símbolo é válido \n");
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );
    eosio::print("*** Memo tem até 256 bytes [ok] \n");

    auto sym_name = sym.name();
    stats statstable( _self, sym_name );
    auto existing = statstable.find( sym_name );
    eosio_assert( existing != statstable.end(), "token with symbol does not exist, can't burn token" );
    eosio::print("*** O símbolo do token existe\n");
    const auto& st = *existing;
    
    require_auth( st.issuer );
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio::print("*** A quantia não é inválida\n");
    eosio_assert( quantity.amount > 0, "must burn positive quantity" );
    eosio::print("*** A quantia é positiva\n");
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio::print("*** O símbolo é preciso\n");

    accounts from_acnts( _self, st.issuer );
    eosio::print("*** Criou \"accounts\"\n");
    const auto& f = from_acnts.get( quantity.symbol.name(), "no balance object found" );
    eosio::print("*** Tentando fazer um accounts.get\n +++++ f.balance.amount: ");
    eosio::print(f.balance.amount);
    eosio::print("\n +++++ quantity.amount: ");
    eosio::print(quantity.amount);
    eosio::print("\n");

    eosio_assert( f.balance.amount >= quantity.amount, "overdrawn balance, can't burn" );
    eosio::print("*** Saldo é maior ou igual que a quantia");
    statstable.modify( st, 0, [&]( auto& s ) {
       s.supply -= quantity;
    });
    eosio::print("*** O supply foi queimado");
    sub_balance( st.issuer, quantity );
    eosio::print("*** Saldo da conta foi subtraído");
    
    //será que precisa disso? acho que não, pois já estou subtraindo o saldo direto da conta "from"
    //if( from != st.issuer ) {
    //   SEND_INLINE_ACTION( *this, transfer, {st.issuer,N(active)}, {st.issuer, to, quantity, memo} );
    //}
}

void token::transfer( account_name from,
                      account_name to,
                      asset        quantity,
                      string       memo )
{
    eosio_assert( from != to, "cannot transfer to self" );
    require_auth( from );
    eosio_assert( is_account( to ), "to account does not exist");
    auto sym = quantity.symbol.name();
    stats statstable( _self, sym );
    const auto& st = statstable.get( sym );

    require_recipient( from );
    require_recipient( to );

    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );


    sub_balance( from, quantity );
    add_balance( to, quantity, from );
}

void token::sub_balance( account_name owner, asset value ) {
   eosio::print(" ## sub_balance ## \n");
   accounts from_acnts( _self, owner );
   eosio::print(" ** criando from_acnts \n");
   const auto& from = from_acnts.get( value.symbol.name(), "no balance object found" );
   eosio::print(" ** consultando \n");
   eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );
   eosio::print(" ** Tentando fazer um accounts.get\n +++++ f.balance.amount: ");
    eosio::print(from.balance.amount);
    eosio::print("\n +++++ quantity.amount: ");
    eosio::print(value.amount);
    /*eosio::print("\n +++++ from: ");
    eosio::print(from.name);
    eosio::print("\n +++++ owner: ");
    eosio::print(owner.name);*/
    eosio::print("\n");

   if( from.balance.amount == value.amount ) {
       eosio::print("** from.balance.amount == value.amount \n");
      from_acnts.erase( from );
      eosio::print("** from_acnts.erase( from );\n");
   } else {
       eosio::print("** else \n");
      from_acnts.modify( from, owner, [&]( auto& a ) {
          eosio::print("** from_acnts.modify( from, owner, [&]( auto& a ) \n");
          a.balance -= value;
          eosio::print("** a.balance -= value; \n");
      });
   }
}

void token::add_balance( account_name owner, asset value, account_name ram_payer )
{
   accounts to_acnts( _self, owner );
   auto to = to_acnts.find( value.symbol.name() );
   if( to == to_acnts.end() ) {
      to_acnts.emplace( ram_payer, [&]( auto& a ){
        a.balance = value;
      });
   } else {
      to_acnts.modify( to, 0, [&]( auto& a ) {
        a.balance += value;
      });
   }
}

} /// namespace eosio

EOSIO_ABI( eosio::token, (create)(issue)(burn)(transfer) )
