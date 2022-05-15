// Husam Almanakly 
// JPA Repository to interact with database with favorited items

package edu.cooper.ece366.project.server.repository;

import edu.cooper.ece366.project.server.Components.User;
import edu.cooper.ece366.project.server.Components.favorited;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<favorited, Long> {

    List<favorited> findByUserID(int userID);
    
}
